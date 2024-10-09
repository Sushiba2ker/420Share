import { useState, useEffect } from "react"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@/components/ui/button"
import { CheckCircle, Globe, Lock, ArrowRight, FileUp } from "lucide-react"
import { motion } from "framer-motion"

const FEATURES = [
  {
    icon: <CheckCircle className="h-6 w-6 text-green-400" />,
    heading: "Dễ Sử Dụng",
    text: "Không cần đăng ký hay đăng nhập. Mở ứng dụng web và bắt đầu chia sẻ ngay lập tức!",
  },
  {
    icon: <Lock className="h-6 w-6 text-blue-400" />,
    heading: "An Toàn",
    text: "File của bạn được truyền trực tiếp từ trình duyệt này sang trình duyệt khác, không bao giờ lưu trữ trên máy chủ.",
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-400" />,
    heading: "Mọi Nơi",
    text: "Dễ dàng chia sẻ file trên mọi thiết bị, bất kể bạn đang ở đâu trên thế giới.",
  },
]

export default function Component() {
  const [username, setUsername] = useState<string | null>(null)
  const roomId = uuidV4()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    setUsername(storedUsername)
  }, [])

  const btnLink = username ? `/${roomId}` : `/settings?roomId=${roomId}`

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Chia Sẻ File Thế Hệ Mới, Nhanh Chóng và Miễn Phí.</h2>
            <p className="text-xl mb-8 text-gray-300">
              Chia sẻ file ngay lập tức với bất kỳ ai, ở bất kỳ đâu, trực tiếp qua trình duyệt của bạn.
            </p>
            <a href={btnLink}>
              <Button size="lg" className="group">
                Bắt Đầu Chia Sẻ
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-3xl opacity-30"></div>
              <div className="relative bg-gray-800 rounded-lg p-8 shadow-xl">
                <FileUp className="h-16 w-16 text-blue-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Cách Hoạt Động</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Chọn file bạn muốn chia sẻ</li>
                  <li>Nhận đường link chia sẻ độc nhất</li>
                  <li>Gửi link cho người nhận</li>
                  <li>Họ tải file trực tiếp từ trình duyệt của bạn</li>
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map(({ icon, heading, text }) => (
            <div key={heading} className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                {icon}
                <h3 className="text-xl font-semibold ml-3">{heading}</h3>
              </div>
              <p className="text-gray-300">{text}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
