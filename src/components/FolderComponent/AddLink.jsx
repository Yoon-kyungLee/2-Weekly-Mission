import addLink from "../../assets/add-link.png";

function AddLink() {
  return (
    <div className="add-link-bar">
      <div className="add-link-container">
        <input className="addLink" placeholder="링크를 추가해 보세요" />
        <img src={addLink} alt="링크 아이콘" />
        <button className="add button">추가하기</button>
      </div>
    </div>
  );
}

export default AddLink;