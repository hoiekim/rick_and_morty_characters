import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { rickAndMorty } from "../lib/graphql";

interface ItemDetailProps {
  id: string;
}

const ItemDetail = ({ id }: ItemDetailProps) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useQuery(id, () => {
    return rickAndMorty(`
        query {
          character(id: ${id}) {
            id
            name
            status
            species
            type
            gender
            origin { id }
            location { id }
            image
            episode { id }
            created
          }
        }
      `).then((r) => r.character);
  });

  if (!id) return <></>;
  if (!isSuccess) return <></>;

  const { gender, image, name, species, status, type } = data;
  return (
    <div className="item_detail" onClick={() => navigate("/")}>
      <div className="item_detail---box">
        <div className="item_detail---box---image">
          <img src={image} alt={name} width={300} />
        </div>
        <div className="item_detail---box---info">
          <div className="item_detail---box---info---name">{name}</div>
          <div>
            {[gender, status, species, type].filter((e) => e).join(" | ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
