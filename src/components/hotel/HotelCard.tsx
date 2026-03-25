
type Room = {
  Rooms: string[];
  TotalPrice: number;
  Currency: string;
  RoomBasis: string;
};

type Hotel = {
  id: number;
  hotel_name: string;
  city: string;
  country: string;
  star_rating: number;
  thumbnails: string[];
  amenities: string[];
  rooms: Room[];
   total_price: number;
};
const styles = {
  card: {
    display: "flex",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "10px",
    overflow: "hidden",
    width: "500px"
  },
  image: {
    width: "200px",

  },
  content: {
    padding: "10px",
    flex: 1
  },
  amenities: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap" as const,
    margin: "6px 0"
  },
  tag: {
    background: "#eee",
    padding: "2px 6px",
    fontSize: "12px",
    borderRadius: "4px"
  },
  price: {
    color: "green",
    fontWeight: "bold"
  }
};
const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  console.log(hotel);
  const firstRoom = hotel.rooms?.[0];

  return (
    <div style={styles.card}>
      
      <img
        src={'/5img.jpg'}
        alt={hotel.hotel_name}
        style={styles.image}
        loading="lazy"
      />

      
      <div style={styles.content}>
        <h3>{hotel.hotel_name}</h3>

        <p>{hotel.city}, {hotel.country}</p>

        <p>Rating {hotel.star_rating}</p>

      
        <div style={styles.amenities}>
          {hotel.amenities?.map((item, i) => (
            <span key={i} style={styles.tag}>{item}</span>
          ))}
        </div>

      
        {firstRoom && (
          <>
            <p><strong>{firstRoom.Rooms[0]}</strong></p>
            <p>{firstRoom.RoomBasis}</p>

            <p style={styles.price}>
              {firstRoom.Currency} {hotel.total_price}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default HotelCard;