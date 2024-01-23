import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-3 flex flex-col justify-center items-center">
      <div className="flex items-center mb-3">
        <a
          className="px-2 text-2xl text-darkBlue"
          href="https://github.com/PedroJacobCard"
        >
          <DiGithubBadge />
        </a>
        <a
          className="px-2 text-xl text-darkBlue"
          href="https://www.linkedin.com/in/pedro-jacob-82374bb3/"
        >
          <FaLinkedin />
        </a>
        <a
          className="px-2 text-xl text-darkBlue"
          href="https://twitter.com/pedrojacob05"
        >
          <FaSquareXTwitter />
        </a>
      </div>
      <span className="text-xs sm:text-sm">
        &copy; This Website is designed by GTCoding, <br /> new version applyed
        by Pedro Jacob | {year}
      </span>
      <p className="text-xs sm:text-sm">All rights reserved</p>
    </footer>
  );
}

export default Footer;
