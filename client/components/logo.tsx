import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link href={"/"} passHref>
            <a>
                <Image src="/logo-dark.svg" width={50} height={50} alt="logo" />
            </a>
        </Link>
    )
}