interface UserImage {
  filename: string;
  url: string;
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
                <div className="col-6">Image analysis will go here</div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
