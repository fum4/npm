import type { ReactNode } from "react";
import "./globals.css";

interface Props {
	children: ReactNode;
}

export const metadata = {
	title: "react-redux-history/demo",
	description: "react-redux-history playground",
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
