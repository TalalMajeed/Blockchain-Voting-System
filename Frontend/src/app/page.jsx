import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <header className="bg-transparent border-b-2 flex items-center justify-between h-[70px] px-8 absolute top-0 w-full">
                <div className="text-xl font-semibold">Voting System</div>
                <Link href="/login">
                    <div className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-500 cursor-pointer">
                        Login
                    </div>
                </Link>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow">
                <Image src="/logo.png" width={120} height={120} alt="Logo" />
                <h1 className="text-center text-4xl mt-10 font-semibold text-gray-800">
                    Welcome to a decentralized Voting System
                </h1>
                <p className="text-2xl text-gray-600">Powered by Ganache & Truffle</p>
            </main>

            <footer className="text-center text-base py-4 bg-gray-800 text-white mt-auto">
                Voting System ©2025 | All Rights Reserved
            </footer>
        </div>
    );
}
