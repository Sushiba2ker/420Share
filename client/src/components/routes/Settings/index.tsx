import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Settings() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      usernameInput: HTMLInputElement;
    };
    const usernameInputValue = formElements.usernameInput.value;

    setUsername(usernameInputValue);

    if (roomId) {
      navigate(`/${roomId}`, { replace: true });
    } else {
      toast({ title: "Đã lưu cài đặt." });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="prose prose-invert">
            <CardTitle className="text-2xl font-bold text-white">Chọn Biệt Danh</CardTitle>
            <CardDescription className="text-gray-300">
              Biệt danh được sử dụng để nhận dạng thiết bị trong phòng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <Input
                id="usernameInput"
                placeholder="Biệt danh thú vị"
                maxLength={20}
                defaultValue={username}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button 
                // className="w-full sm:w-fit self-end bg-blue-600 hover:bg-blue-700 transition-colors"
                className="group"
                type="submit"
              >
                Lưu
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}