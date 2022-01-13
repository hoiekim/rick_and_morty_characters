import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { rickAndMorty } from "../lib/graphql";

interface ItemDetailProps {
  id: string;
}

const ItemDetail = ({ id }: ItemDetailProps) => {
  const { pageParam = "1" } = useParams();
  const page = +pageParam || 1;
  const navigate = useNavigate();
  const { data, isSuccess } = useQuery(`character-${id}`, () => {
    return rickAndMorty(`
        query {
          character(id: ${id}) {
            id
            name
            status
            species
            type
            gender
            location {
              name
              type
              dimension
              residents { name }
            }
            image
          }
        }
      `).then((r) => r.character);
  });

  if (!id) return <></>;
  if (!isSuccess) return <></>;

  const { gender, image, name, species, status, type, location } = data;

  // Unfortunately, location sometimes returns null.
  const locationObject =
    (location && { ...location, residents: location.residents.length || 0 }) ||
    {};

  return (
    <div className="item_detail" onClick={() => navigate(`/${page}`)}>
      <div className="item_detail---box">
        <div className="item_detail---box---info">
          <div className="item_detail---box---info---name">{name}</div>
          <div className="item_detail---box---info---others">
            <div>
              <div>gender</div>
              <div>{gender}</div>
            </div>
            <div>
              <div>status</div>
              <div>{status}</div>
            </div>
            <div>
              <div>species</div>
              <div>{species}</div>
            </div>
            <div>
              <div>type</div>
              <div>{type}</div>
            </div>
          </div>
        </div>
        <div className="item_detail---box---image">
          <img src={image} alt={name} width={300} />
        </div>
        <div className="item_detail---box---info">
          <div className="item_detail---box---info---location">
            <div className="item_detail---box---info---location---info">
              <div>Location</div>
              <div className="item_detail---box---info---location---info---name">
                {locationObject.name}
              </div>
              <div className="item_detail---box---info---location---info---others">
                <div>
                  <div>Type</div>
                  <div>{locationObject.type}</div>
                </div>
                <div>
                  <div>Dimension</div>
                  <div>{locationObject.dimension}</div>
                </div>
                <div>
                  <div>Residents</div>
                  <div>{locationObject.residents}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
