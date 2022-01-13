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
        <div className="item_detail---box---name">{name}</div>
        <div className="item_detail---box---info">
          <div className="item_detail---box---info---image">
            <img src={image} alt={name} width={300} />
          </div>
          <div className="item_detail---box---info---others">
            <table>
              <tr>
                <th colSpan={2}>Gender</th>
                <td>{gender}</td>
              </tr>
              <tr>
                <th colSpan={2}>Status</th>
                <td>{status}</td>
              </tr>
              <tr>
                <th colSpan={2}>Species</th>
                <td>{species}</td>
              </tr>
              <tr>
                <th colSpan={2}>Type</th>
                <td>{type}</td>
              </tr>
              <tr>
                <th rowSpan={4}>Location</th>
                <th>Name</th>
                <td>{locationObject.name}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{locationObject.type}</td>
              </tr>
              <tr>
                <th>Dimension</th>
                <td>{locationObject.dimension}</td>
              </tr>
              <tr>
                <th>Residents</th>
                <td>{locationObject.residents}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
