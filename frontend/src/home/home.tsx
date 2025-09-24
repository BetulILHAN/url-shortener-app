import "./home.css";
import type { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { isValidUrl } from "./utils/valid-url/is-valid-url";

const Home: FunctionComponent = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | undefined>(undefined);

  const navigate = (shortUrl: string) => {
    window.location.href = shortUrl;
  };

  const validateClassName = useMemo(() => {
    return isValidUrl(originalUrl)
      ? "home__validate"
      : "home__validate--disabled";
  }, [originalUrl]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setOriginalUrl(event.currentTarget.value);
    if (value.length === 0) {
      setShortUrl(undefined);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post<string>(
        "http://localhost:3000/api/url-shortener",
        { originalURL: originalUrl },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShortUrl(response.data);
      })
      .catch((error) => {
        console.error("Error when shortening URL:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="home__container">
      <h1 className="home__title">URL SHORTENER</h1>
      <div className="home__url-shortener">
        <label className="home__url-shortener__label">Enter the long url</label>
        <input
          value={originalUrl}
          name={"originalUrl"}
          onChange={handleChange}
          placeholder="http://example-url-valid.com"
          className="home__url-shortener__field"
        />
      </div>
      <button
        type="submit"
        disabled={!isValidUrl(originalUrl)}
        className={validateClassName}
      >
        validate
      </button>
      {shortUrl && (
        <button
          className="home____redirect-short-url__validate"
          onClick={() => navigate(shortUrl)}
        >
          {shortUrl}
        </button>
      )}
    </form>
  );
};

export { Home };
