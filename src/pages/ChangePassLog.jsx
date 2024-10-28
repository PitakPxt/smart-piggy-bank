import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import InputLabel from "../components/InputLabel";
import BtnYellow from "../components/BtnYellow";
import { useNavigate, useLocation } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassLog() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state; // รับ userId จาก state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const passwordRef = collection(db, "password");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("password", "==", oldPassword),
      where("email", "==", "whawha@bumail.net")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("รหัสผ่านเดิมไม่ถูกต้อง");
      return;
    } else {
      if (newPassword !== confirmNewPassword) {
        toast.error("รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ไม่ตรงกัน");
        return;
      } else {
        await updateDoc(doc(db, "users", userId), {
          password: newPassword,
        });
        toast.success("สำเร็จ");
      }
    }
  };
  //whawha@bumail.net
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col justify-center items-center
         w-[756px] h-[728px]  bg-neutral-white-100 rounded-3xl overflow-hidden drop-shadow-lg"
        >
          <div className="w-[556px] h-[448px] flex flex-col justify-center items-center">
            <div className="mb-[46px]">
              <Logo />
            </div>
            <div className="flex flex-col w-full gap-[18px] mb-[52px]">
              <InputLabel
                text={"รหัสผ่านเดิม"}
                placeHolder={"กรอกรหัสผ่านเดิม"}
                required={true}
                isEye={true}
                autoComplete="off"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputLabel
                text={"รหัสผ่านใหม่"}
                placeHolder={"กรอกรหัสผ่านใหม่"}
                required={true}
                isEye={true}
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputLabel
                text={"ยืนยันรหัสผ่านใหม่อีกครั้ง"}
                placeHolder={"กรอกรหัสผ่านใหม่อีกครั้ง"}
                required={true}
                isEye={true}
                autoComplete="off"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <BtnYellow className={"px-[150px]"} text={"เปลี่ยนรหัสผ่าน"} />
          </div>
        </form>
      </div>
    </>
  );
}
