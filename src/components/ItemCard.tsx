interface ItemCardProps {
  data: {
    id: string;
    name: string;
    status: string;
    species: string;
  };
}

export default ({ data }: ItemCardProps) => {
  const { name, status, species } = data;
  return (
    <div className="item_card">
      <div className="item_card---title">{name}</div>
      <div className="item_card---info">
        <span>
          {status} | {species}
        </span>
      </div>
    </div>
  );
};
