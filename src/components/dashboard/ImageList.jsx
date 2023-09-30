export const ImageList = ({ images, onRemove }) => (
  <>
    {images.map((image) => (
      <div key={image.id}>
        <img src={image.mediumUrl} alt="" />
        <button
          onClick={(e) => {
            e.preventDefault()
            onRemove(image.id)
          }}
        >
          Remove
        </button>
      </div>
    ))}
  </>
)
