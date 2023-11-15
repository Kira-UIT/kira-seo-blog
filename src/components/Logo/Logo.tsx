import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <div className="text-3xl font-heading">Kira Blog</div>
      <FontAwesomeIcon
        icon={faBrain}
        className="text-2xl text-slate-400 ml-2"
      />
    </Link>
  );
};

export default Logo;
