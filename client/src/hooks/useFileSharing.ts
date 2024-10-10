import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
// @ts-ignore
import WebTorrent from "webtorrent/dist/webtorrent.min.js";
import { download, formatBytes } from "../lib/utils";
import { WEBTORRENT_CONFIG } from "@/lib/constants";

interface UseFileSharingProps {
  roomId: string;
  username: string;
}

interface UseFileSharingReturn {
  connectionStatus: string;
  transferSpeed: string;
  sendFile: (files: File[], targetUsernames: string[]) => void;
  showDownloadDialog: boolean;
  setShowDownloadDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showUsernameTakenDialog: boolean;
  downloadData: { files: WebTorrent.File[] } | null;
  handleDownload: () => void;
  peers: string[];
  fileProgress: { [filename: string]: number };
  isSending: boolean;
}

export function useFileSharing({
  roomId,
  username,
}: UseFileSharingProps): UseFileSharingReturn {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [webtorrent] = useState(() => new WebTorrent(WEBTORRENT_CONFIG));
  const [connectionStatus, setConnectionStatus] = useState("");
  const [torrentBeingSent, setTorrentBeingSent] = useState<WebTorrent.Torrent | null>(null);
  const [transferSpeed, setTransferSpeed] = useState("0 kB/s");
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showUsernameTakenDialog, setShowUsernameTakenDialog] = useState(false);
  const [downloadData, setDownloadData] = useState<{
    files: WebTorrent.File[];
  } | null>(null);
  const [peers, setPeers] = useState<string[]>([]);
  const [fileProgress, setFileProgress] = useState<{ [filename: string]: number }>({});
  const [isSending, setIsSending] = useState(false);

  const onFileUploadComplete = useCallback(() => {
    setConnectionStatus("Tệp đã được gửi.");
    setTransferSpeed("0 kB/s");
    setIsSending(false);
  }, []);

  const onFileDownloadComplete = useCallback(() => {
    setConnectionStatus("Đã nhận tệp! Đang tạo tải xuống.");
    setTransferSpeed("0 kB/s");
  }, []);

  const onUploadingFile = useCallback((
    filename: string,
    progress: number,
    uploadSpeed: string,
  ) => {
    setConnectionStatus(`Đang gửi ${filename}: ${progress}%`);
    setTransferSpeed(uploadSpeed);
  }, []);

  const onDownloadingFile = useCallback((progress: number, downloadSpeed: string) => {
    setConnectionStatus(`Đang nhận tệp: ${progress}%`);
    setTransferSpeed(downloadSpeed);
  }, []);

  const reset = useCallback(() => {
    if (torrentBeingSent) {
      torrentBeingSent.destroy();
      setTorrentBeingSent(null);
    }
    setConnectionStatus("");
    setTransferSpeed("0 kB/s");
    setIsSending(false);
  }, [torrentBeingSent]);

  const sendFile = useCallback(
    (filesToSend: File[], targetUsernames: string[]) => {
      if (!filesToSend.length || !socket) {
        console.error("Không thể gửi file: Không có file hoặc không có kết nối socket");
        return;
      }
      setConnectionStatus("Đang chuẩn bị để gửi.");
      setIsSending(true);
  
      try {
        webtorrent.seed(filesToSend, (torrent: WebTorrent.Torrent) => {
          setTorrentBeingSent(torrent);
  
          socket.emit("file-link", torrent.magnetURI, socket.id, targetUsernames, filesToSend.map(f => f.name));
  
          torrent.on("upload", () => {
            const progress = Math.round((torrent.uploaded / torrent.length) * 100);
            const uploadSpeed = `${formatBytes(torrent.uploadSpeed)}/s`;
  
            onUploadingFile(filesToSend.map(f => f.name).join(", "), progress, uploadSpeed);
  
            if (progress >= 100) {
              onFileUploadComplete();
              // Không set isSending về false ở đây
            }
          });
  
          torrent.on("error", (error: Error) => {
            console.error("Lỗi WebTorrent:", error);
            setIsSending(false);
            setConnectionStatus("Lỗi khi gửi file.");
          });
        });
      } catch (error) {
        console.error("Lỗi khi tạo torrent:", error);
        setIsSending(false);
        setConnectionStatus("Lỗi khi chuẩn bị gửi file.");
      }
    },
    [socket, webtorrent, onUploadingFile, onFileUploadComplete]
  );

  const handleDownload = useCallback(async () => {
    if (downloadData && downloadData.files) {
      const files = downloadData.files;
      for (const file of files) {
        const blob = await file.blob();
        download(blob, file.name);
      }
      setShowDownloadDialog(false);
    }
  }, [downloadData]);

  const handleFileLink = useCallback(
    (magnetURI: string, senderId: string, fileNames: string[]) => {
      webtorrent.add(magnetURI, (torrent: WebTorrent.TorrentFile) => {
        setShowDownloadDialog(true);
        setDownloadData({ files: torrent.files });
        
        const initialProgress = fileNames.reduce((acc, fileName) => {
          acc[fileName] = 0;
          return acc;
        }, {} as { [filename: string]: number });
        setFileProgress(initialProgress);

        torrent.on("download", () => {
          const overallProgress = Math.round(torrent.progress * 100);
          const downloadSpeed = `${formatBytes(torrent.downloadSpeed)}/s`;
          onDownloadingFile(overallProgress, downloadSpeed);

          torrent.files.forEach((file: WebTorrent.TorrentFile) => {
            setFileProgress((prev) => ({
              ...prev,
              [file.name]: Math.round(file.progress * 100),
            }));
          });
        });

        torrent.on("done", () => {
          socket?.emit("done-downloading", senderId);
          onFileDownloadComplete();
        });
      });
    },
    [webtorrent, socket, onDownloadingFile, onFileDownloadComplete, setFileProgress, setShowDownloadDialog, setDownloadData]
  );

  const resetSendingState = useCallback(() => {
    setIsSending(false);
    setConnectionStatus("");
    setTransferSpeed("0 kB/s");
  }, []);

  useEffect(() => {
    const SOCKET_URL =
      process.env.NODE_ENV === "production"
        ? window.location.origin
        : "http://localhost:3001";

    const socket = io(SOCKET_URL);
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    webtorrent.on("error", (error: any) => {
      console.error("Lỗi WebTorrent client:", error);
    });
  }, [webtorrent]);

  useEffect(() => {
    if (!socket || !roomId || !username) return;

    const handleConnect = () => {
      socket.emit("join-room", roomId, username, socket.id);
    };

    const handleUserConnected = (username: string) => {
      setPeers((prevPeers) => {
        if (prevPeers.includes(username)) return prevPeers;
        return [...prevPeers, username];
      });
      setConnectionStatus("Đã kết nối.");
    };

    const handleUpdateUsers = (usernames: string[]) => {
      const filtered = usernames.filter((u) => u !== username);
      setPeers(filtered);
    };

    const handleConnectionEstablished = (username: string) => {
      setConnectionStatus("Đã kết nối.");
    };

    const handleDoneDownloading = () => {
      onFileUploadComplete();
      resetSendingState();
    };

    const handleUserDisconnected = (username: string) => {
      setPeers((prevPeers) => prevPeers.filter((peer) => peer !== username));
      reset();
    };

    const handleUsernameTaken = () => {
      setShowUsernameTakenDialog(true);
    };

    socket.on("connect", handleConnect);
    socket.on("username-taken", handleUsernameTaken);
    socket.on("user-connected", handleUserConnected);
    socket.on("update-users", handleUpdateUsers);
    socket.on("connection-established", handleConnectionEstablished);
    socket.on("file-link", handleFileLink);
    socket.on("done-downloading", handleDoneDownloading);
    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("username-taken", handleUsernameTaken);
      socket.off("user-connected", handleUserConnected);
      socket.off("update-users", handleUpdateUsers);
      socket.off("connection-established", handleConnectionEstablished);
      socket.off("file-link", handleFileLink);
      socket.off("done-downloading", handleDoneDownloading);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [socket, roomId, username, handleFileLink, reset, onFileUploadComplete, resetSendingState]);

  return {
    connectionStatus,
    transferSpeed,
    sendFile,
    showDownloadDialog,
    setShowDownloadDialog,
    showUsernameTakenDialog,
    downloadData,
    handleDownload,
    peers,
    fileProgress,
    isSending,
  };
}