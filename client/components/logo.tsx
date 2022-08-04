import Image from "next/image"
import Link from "next/link"

function Logo() {
    return (
        <Link href={"/"} passHref>
            <a>
                <Image src="/logo-dark.svg" width={50} height={50} alt="logo" />
            </a>
        </Link>
    )
}

export default Logo