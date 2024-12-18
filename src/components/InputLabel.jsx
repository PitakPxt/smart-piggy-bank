import React from "react";
import IconEyeClose from "@images/icon-EyeClose.svg";
import IconEye from "@images/icon-Eye.svg";
import { cn } from "../lib/tailwindcss";
import { useState } from "react";

export default function InputLabel({
  text,
  placeHolder,
  name,
  className,
  required = false,
  isInline = false,
  value,
  onChange,
  autoComplete,
  isEye = true,
  inputBorderClassName,
}) {
  const [eye, setEye] = useState(isEye);
  const handleEye = () => {
    setEye(!eye);
  };
  return (
    <>
      <div className={cn(isInline ? "flex gap-3.5 items-center" : "w-full")}>
        <h3
          className={cn(
            "xl:mb-[10px] lg:mb-[4px] md:mb-[4px] sm:mb-2 mb-2 text-h3-bold xl:text-h3-bold lg:text-h3-bold md:text-h3-bold sm:text-h5-bold"
          )}
        >
          {text}
        </h3>
        <div
          className={cn(
            "sm:py-[4px] md:py-[8px] pl-3 pr-3 rounded-[12px] border-[1px] border-neutral-800 text-h3 relative flex",
            inputBorderClassName,
            isInline && "flex-1"
          )}
        >
          <input
            className={cn(
              "w-full outline-none xl:text-h3 lg:text-h4 md:text-h4 sm:text-h5"
            )}
            name={name}
            type={eye ? "password" : "text"}
            required={required}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
          />
          {isEye && (
            <img
              className="size-[18px] md:size-[24px] absolute right-0 top-1/2 -translate-y-1/2 mr-3 cursor-pointer"
              src={eye ? IconEyeClose : IconEye}
              alt=""
              onClick={handleEye}
            />
          )}
        </div>
      </div>
    </>
  );
}
