import tmdbApi from "api/tmdbApi";
import React, { useEffect, useRef, useState } from "react";

function Video(props) {
  const [videoMovie, setVideoMovie] = useState("");
  const iframeRef = useRef(null);

  const fetchVideo = async () => {
    const respone = await tmdbApi.getVideos(props.category, props.item.id);
    let video;

    if (respone.results) {
      respone.results.map((item) => {
        if (item.name && item.name == "Official Trailer") {
          video = item;
        }
      });
      setVideoMovie(video ? video : respone.results[0]);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [props.category, props.item.id]);

  return (
    <>
      <div className="video" ref={props.innerRef}>
        <div className="container">
          <h3 className="video-title">{props.item.original_title}</h3>
          {videoMovie && (
            <div className="box-video">
              <iframe
                className="box__inner"
                src={`https://www.youtube.com/embed/${videoMovie.key}`}
                width="100%"
                title="video"
                ref={iframeRef}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Video;
