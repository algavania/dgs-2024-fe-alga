import ErrorImage from "../../assets/images/error.svg";
import Button from "../../components/Button/Button";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center">
      <img
        src={ErrorImage}
        style={{ height: "80vh" }}
        className="w-full "
        alt="Error 404"
      />
      <Button title="Go Back" onClick={() => {
        window.history.back();
      }}/>
    </div>
  );
}
