import React from "react";

type LoginModalProps = {
    show: boolean;
    loginData: { username: string; password: string };
    setLoginData: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
};

export default function LoginModal({ show, loginData, setLoginData, onSubmit, onCancel }: LoginModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,182,212,0.25),transparent_70%)]">
            <div className="max-w-sm m-5 p-6 px-8 bg-gradient-to-b from-white to-[#E4E6EF] rounded-4xl border-4 border-white relative z-10">
                <div className="text-center font-semibold text-3xl text-black">Accesso Amministratore</div>
                <form onSubmit={onSubmit} className="mt-5">
                    <input
                        type="text"
                        id="username"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        placeholder="Username"
                        className="w-full bg-white border-none py-4 px-5 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#E4E6EF] border-x-2 border-transparent focus:outline-none focus:border-x-2 focus:border-[#12B1D1] placeholder:text-gray-400"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Password"
                        className="w-full bg-white border-none py-4 px-5 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#E4E6EF] border-x-2 border-transparent focus:outline-none focus:border-x-2 focus:border-[#12B1D1] placeholder:text-gray-400"
                        required
                    />
                    <div className="flex flex-col items-center gap-4 mx-auto mt-5 mb-2">
                        <button
                            type="submit"
                            className="block font-bold bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white px-16 py-4 rounded-xl shadow-[0_10px_10px_-15px_rgba(133,189,215,0.878)] border-none transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.878)] active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.878)] cursor-pointer"
                        >
                            Accedi
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="block font-normal underline text-black px-16 py-4 border-none cursor-pointer"
                        >
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}