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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Accesso Amministratore</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-between pt-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Accedi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
