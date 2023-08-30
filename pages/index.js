import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import Facebook from "../components/Facebook";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <h1 className="text-3xl font-semibold">Tiệm Cà Phê Ông Quan</h1>
      <h2 className="italic">Coming Soon</h2>
      <div className="fixed rounded-full bottom-8 right-8 z-[60]">
        <Facebook />
      </div>
    </div>
  );
}
