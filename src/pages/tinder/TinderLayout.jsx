import React from "react";
import Header from "../HomePage/Header";
import { Outlet } from "react-router-dom";

const TinderLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="z-4">
        <Header />
      </div>
      <div className="flex h-screen dark:bg-black bg-[rgb(240,242,245)] w-full  z-1">
        <section className="flex h-full w-full mt-5">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default TinderLayout;
