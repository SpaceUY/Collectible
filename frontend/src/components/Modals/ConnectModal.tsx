import Image from "next/image";
import React, { useEffect } from "react";
import Button from "../UI/Button";
import { Separator } from "./Separator";
import Backdrop from "./Backdrop";
import { useUser } from "@/context/UserContext";

interface ConnectModalProps {
  handleCloseConnectModal: () => void;
}

const ConnectModal = ({ handleCloseConnectModal }: ConnectModalProps) => {
  const { user, connectUser } = useUser();

  console.log(user, connectUser);
  useEffect(() => {
    if (user?.isLoggedIn) {
      handleCloseConnectModal();
    }
  }, [user?.isLoggedIn]);

  /**  
   @DEV loader while loggin to be implemented
  **/

  return (
    <>
      <Backdrop />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="min-w-[500px] rounded-xl border-2 border-collectible-purple-borders bg-collectible-dark-purple p-8">
          <div className="mb-14 flex justify-between">
            <Image
              src={"/collectible-logo.svg"}
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
            <Button isLarge fullWidth action={connectUser}>
              Connect account
            </Button>
            <Separator />
            <Button
              isLarge
              fullWidth
              variant="white"
              action={() => {
                // connectBrand();
                alert("Connect as a creator callback");
              }}
            >
              Connect as a creator
            </Button>
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectModal;
