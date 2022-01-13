import { useState } from "react";
import { useQuery } from "react-query";
import { rickAndMorty } from "../lib/graphql";

interface ItemDetailProps {
  id: string;
}

const ItemDetail = ({ id }: ItemDetailProps) => {
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

  console.log(data);

  const { gender, image, name, species, status, type } = data;
  return (
    <div className="item_detail">
      <div className="item_detail---box">
        <div>
          <img src={image} />
        </div>
        <div>
          <div>{name}</div>
          <div>
            {[gender, status, species, type].filter((e) => e).join(" | ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
