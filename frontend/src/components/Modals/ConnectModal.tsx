import Image from "next/image";
import React from "react";
import Button from "../UI/Button";
import { Separator } from "./Separator";
import Backdrop from "./Backdrop";

interface ConnectModalProps {
  handleCloseConnectModal: () => void;
}

const ConnectModal = ({ handleCloseConnectModal }: ConnectModalProps) => {
  return (
    <>
      <Backdrop />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="min-w-[480px] rounded-lg border-2 border-collectible-purple-borders bg-collectible-dark-purple p-8">
          <div className="mb-16 flex justify-between">
            <Image
              src={"collectible-logo.svg"}
              width={60}
              height={50}
              alt="Collectible Logo"
            />
            <Image
              className="hover:cursor-pointer"
              src={"/page-icons/close-icon.svg"}
              width={20}
              height={20}
              alt="Close connect modal"
              onClick={handleCloseConnectModal}
            />
          </div>
          <p className="mb-3 text-gray-strong">
            Connect as a user or a creator
          </p>
          <div className="flex flex-col justify-center">
            <Button
              isLarge
              fullWidth
              action={() => {
                alert("Connect wallet");
              }}
            >
              Connect account
            </Button>
            <Separator />
            <Button
              isLarge
              fullWidth
              variant="white"
              action={() => {
                alert("Connect as a creator callback");
              }}
            >
              Connect as a creator
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectModal;
