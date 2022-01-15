import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { rickAndMorty } from "../../../lib/graphql";

interface ItemDetailProps {
  id: string;
}

export interface CharacterData {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: {
    name: string;
    type: string;
    dimension: string;
    residents: { name: string }[];
  } | null;
}

const ItemDetail = ({ id }: ItemDetailProps) => {
  const { pageParam = "1" } = useParams();
  const page = +pageParam || 1;
  const navigate = useNavigate();
  const { data, isSuccess } = useQuery<CharacterData>(`character-${id}`, () => {
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

  const closeItemDetail = () => navigate(`/${page}`);

  // for accessibility
  useEffect(() => {
    document.addEventListener("keydown", closeItemDetail);
    return () => {
      document.removeEventListener("keydown", closeItemDetail);
    };
  }, []);

  if (!id) return <></>;
  if (!isSuccess || !data) return <></>;

  const { gender, image, name, species, status, type, location } = data;

  return (
    <div className="item_detail" onClick={closeItemDetail}>
      <div className="item_detail---box">
        <div className="item_detail---box---name">{name}</div>
        <div className="item_detail---box---info">
          <div className="item_detail---box---info---image">
            <img src={image} alt={name} width={300} height={300} />
          </div>
          <div className="item_detail---box---info---others">
            <table>
              <tbody>
                <tr>
                  <th>Gender</th>
                  <td colSpan={2}>{gender}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td colSpan={2}>{status}</td>
                </tr>
                <tr>
                  <th>Species</th>
                  <td colSpan={2}>{species}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td colSpan={2}>{type}</td>
                </tr>
                <tr>
                  <th rowSpan={4}>Location</th>
                  <th>Name</th>
                  <td>{location && location.name}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{location && location.type}</td>
                </tr>
                <tr>
                  <th>Dimension</th>
                  <td>{location && location.dimension}</td>
                </tr>
                <tr>
                  <th>Residents</th>
                  <td>{location && location.residents.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
