import { useLocation, Link } from "react-router-dom";

interface ItemCardProps {
  data: {
    id: string;
    name: string;
    status: string;
    species: string;
  };
}

const ItemCard = ({ data }: ItemCardProps) => {
  const { pathname } = useLocation();
  const { id, name, status, species } = data;
  return (
    <div className="item_card">
      <Link
        to={`${pathname}?id=${id}`}
        aria-label={`Open detail information about ${name}`}
      >
        <div className="item_card---title">{name}</div>
        <div className="item_card---info">
          <span>
            {status} | {species}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
