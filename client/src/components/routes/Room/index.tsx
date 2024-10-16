import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFileSharing } from "@/hooks/useFileSharing";
import ShareLinkAlert from "./ShareLink/ShareLinkAlert";
import DownloadDialog from "./DownloadDialog";
import SendFileButton from "./SendFileButton";
import RoomInfo from "./RoomInfo";
import useLocalStorage from "@/hooks/useLocalStorage";
import UsernameTakenDialog from "./UsernameTakenDialog";
import NetworkGraph from "./NetworkGraph";
import { ShareLinkDialog } from "./ShareLink/ShareLinkDialog";

export default function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const [username] = useLocalStorage("username", "");
  const navigate = useNavigate();

  const {
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
    isReceiving,
  } = useFileSharing({ roomId: roomId || "", username });

  useEffect(() => {
    if (!username) {
      navigate(`/settings?roomId=${roomId}`);
    }
  }, [navigate, roomId, username]);

  useEffect(() => {
    console.log("Peers updated:", peers);
  }, [peers]);

  return (
    <div className="w-full px-8 sm:w-[500px] sm:px-0 m-auto space-y-8">
      <NetworkGraph users={[username, ...peers]} isSending={isSending} isReceiving={isReceiving} />
      <RoomInfo
        connectionStatus={connectionStatus}
        transferSpeed={transferSpeed}
        className={connectionStatus === "" ? "hidden" : "block"}
      />
      {connectionStatus === "" && <ShareLinkAlert />}
      {connectionStatus !== "" && (
        <div className="absolute bottom-16 left-8 sm:left-10">
          <ShareLinkDialog />
        </div>
      )}
      <div className="absolute bottom-16 right-8 sm:right-10">
        <SendFileButton
          sendFile={sendFile}
          disabled={peers.length === 0 || isSending}
          peers={peers}
        />
      </div>
      {showDownloadDialog && downloadData && (
        <DownloadDialog
          open={showDownloadDialog}
          setOpen={setShowDownloadDialog}
          filenames={downloadData.files.map(file => file.name)}
          fileProgress={fileProgress}
          onClickDownload={handleDownload}
        />
      )}
      {showUsernameTakenDialog && (
        <UsernameTakenDialog
          open={showUsernameTakenDialog}
          username={username}
          roomId={roomId || ""}
        />
      )}
    </div>
  );
}