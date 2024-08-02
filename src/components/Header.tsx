import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-screen drop-shadow-md bg-red-50 py-2 fixed top-0 left-0 px-3">
      <div className="max-w-[1100px] m-auto flex justify-between items-center">
        <p className="text-2xl m:text-xl font-bold text-orange-600">
          カレンダー登録URL発行
        </p>
        <Link className="text-xl m:text-base underline" href="/">
          予定を作成
        </Link>
      </div>
    </header>
  );
};

export default Header;
