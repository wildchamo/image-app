interface ImageAnalysisItem {
  label: string;
  score: number;
}

interface UserImage {
  filename: string;
  url: string;
  analysis?: ImageAnalysisItem[];
}

type ImageListProps = {
  images: Array<UserImage>;
};

export const ImageList = ({ images }: ImageListProps) => {
  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12">
        {images.map((image, index) => {
          return (
            <div key={index}>
              <div className="row d-flex">
                <div className="col-6">
                  <img src={image.url} width="100%" alt={image.filename} />
                </div>
                <div className="col-6">
                  <div>
                    <strong>Filename:</strong> {image.filename}
                  </div>
                  {image.analysis && image.analysis.length > 0 ? (
                    <div>
                      <strong>Analysis:</strong>
                      {image.analysis.map((item, idx) => (
                        <div
                          key={idx}
                          style={{ marginLeft: "10px", marginBottom: "5px" }}
                        >
                          <div>
                            <strong>{item.label}</strong>
                          </div>
                          <div>Score: {(item.score * 100).toFixed(2)}%</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <strong>Analysis:</strong> <span>Not available</span>
                    </div>
                  )}
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
