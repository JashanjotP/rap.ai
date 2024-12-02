import { useState } from "react";

const RapBattleImage = () => {
  const [objectName, setObjectName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImage = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ objectName }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || "Failed to fetch image");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter object name"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={fetchImage}
          disabled={loading || !objectName}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div>
          <h2>Your Rap Battle Image</h2>
          <img
            src={imageUrl}
            alt="Rap battle generated by OpenAI"
            style={{
              width: "100%",
              maxWidth: "500px",
              border: "2px solid black",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RapBattleImage;
