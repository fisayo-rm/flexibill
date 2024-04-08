import { OverlayTrigger, Tooltip } from "react-bootstrap";
import githubLogoDark from "./assets/img/github-dark.png";
import githubLogo from "./assets/img/github.png";

function Footer() {
  const theme = "light";
  const isStorageWordpress = false;
  return (
    <footer className="row text-secondary px-0 mt-3 d-print-none">
      <div className="col-md-4">
        {/* <div></div> For Language Switcher */}
        <button
          className="btn btn-sm text-secondary"
          onClick={() => console.log("Toggle Theme")}
        >
          {theme === "dark" ? " Lights on " : " Lights off "}{" "}
          <i className="material-icons material-icons-round md-14 align-text-bottom ms-1">
            {theme === "dark" ? "wb_sunny" : "brightness_2"}
          </i>
        </button>
      </div>
      <div className="col-md-8 text-start text-md-end">
        {!isStorageWordpress && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                All your data is saved in your browser and not on any server.
                This application is truly serverless and only you have access to
                your data.
              </Tooltip>
            }
          >
            <small className="pointer">{" What about my data? "}</small>
          </OverlayTrigger>
        )}
        <small className="ps-2">
          Made with{" "}
          <i className="material-icons material-icons-round md-14 align-text-bottom">
            favorite
          </i>
          {" by "}
          <a
            href="https://fisayo.netlify.app"
            className="text-secondary"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Fisayo
          </a>
        </small>
        {!isStorageWordpress && (
          <a
            href="https://github.com/fisayo-rm"
            className="btn btn-sm btn--icon ms-0 ms-md-2"
            target="_blank"
          >
            {theme === "dark" ? (
              <img src={githubLogo} alt="Serverless Invoices Github" />
            ) : (
              <img src={githubLogoDark} alt="Serverless Invoices Github" />
            )}
          </a>
        )}
        {!isStorageWordpress && (
          <a
            href="https://app.mokuapp.io/"
            className="btn btn-sm btn-primary ms-2"
            target="_blank"
          >
            Upgrade
          </a>
        )}
      </div>
    </footer>
  );
}

export default Footer;
