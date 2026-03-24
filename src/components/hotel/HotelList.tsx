"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import HotelCard from "./HotelCard";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("../ui/Select"), { ssr: false });
const MultiSelect = dynamic(() => import("../ui/MultiSelect"), { ssr: false });

const PER_PAGE = 20;

const HotelList = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ── label → value maps ──────────────────────────────────────
  const RATING_OPTIONS = ["5 Star", "4 Star", "3 Star"];
  const RATING_MAP: Record<string, number> = {
    "5 Star": 5,
    "4 Star": 4,
    "3 Star": 3,
  };

  const PRICE_OPTIONS = ["Below 500", "500 - 1000", "Above 1000"];

  const SORT_OPTIONS = ["Low → High", "High → Low", "Top Rated"];
  const SORT_MAP: Record<string, string> = {
    "Low → High": "priceLow",
    "High → Low": "priceHigh",
    "Top Rated": "ratingHigh",
  };
  // ────────────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchHotels = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const url = `http://localhost:3001/hotels?_page=${page}&_per_page=${PER_PAGE}`;
      const res = await fetch(url);
      const result = await res.json();
      const newData = Array.isArray(result) ? result : result.data;
      setData((prev) => {
        const combined = [...prev, ...newData];
        return Array.from(new Map(combined.map((item) => [item.id, item])).values());
      });
      if (!newData || newData.length < PER_PAGE) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHotels(); }, [page]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );
    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [hasMore]);

  const matchesSearch = (hotel: any) => {
    if (!debouncedSearch) return true;
    const words = debouncedSearch.toLowerCase().split(" ");
    const text = `${hotel.hotel_name} ${hotel.city} ${hotel.location}`.toLowerCase();
    return words.every((word) => text.includes(word));
  };

  const filteredData = useMemo(() => {
    const sortKey = SORT_MAP[sortBy] ?? "";

    return data
      .filter((hotel) => {
        // Search
        if (!matchesSearch(hotel)) return false;

        // Rating — map "5 Star" → 5
        if (ratingFilter && hotel.rating !== RATING_MAP[ratingFilter]) return false;

        // Amenities
        if (
          selectedAmenities.length > 0 &&
          !selectedAmenities.every((a) => hotel.amenities?.includes(a))
        ) return false;

        // Price
        const price = hotel.total_price;
        if (priceFilter === "Below 500" && !(price < 500)) return false;
        if (priceFilter === "500 - 1000" && !(price >= 500 && price <= 1000)) return false;
        if (priceFilter === "Above 1000" && !(price > 1000)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortKey === "priceLow") return a.total_price - b.total_price;
        if (sortKey === "priceHigh") return b.total_price - a.total_price;
        if (sortKey === "ratingHigh") return b.rating - a.rating;
        return 0;
      });
  }, [data, debouncedSearch, ratingFilter, selectedAmenities, priceFilter, sortBy]);

  return (
    <>
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search hotels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Select
            options={RATING_OPTIONS}
            value={ratingFilter}
            onChange={setRatingFilter}
            placeholder="Rating"
          />
          <Select
            options={PRICE_OPTIONS}
            value={priceFilter}
            onChange={setPriceFilter}
            placeholder="Price"
          />
          <Select
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort"
          />
          <MultiSelect
            options={["wifi", "pool", "spa", "bar"]}
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            placeholder="Amenities"
          />
        </div>
      </div>

      <p style={styles.count}>{filteredData.length} hotels found</p>

      <div style={styles.grid}>
        {filteredData.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
        {loading && <p>Loading...</p>}
        {!loading && filteredData.length === 0 && <p>No hotels found</p>}
        {!hasMore && filteredData.length > 0 && <p>No more hotels</p>}
        <div ref={observerRef} style={{ height: "20px" }} />
      </div>
    </>
  );
};

export default HotelList;

const styles: any = {
  filterBar: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    padding: "16px",
    justifyContent: "center",
    background: "#f5f5f5",
    borderRadius: "10px",
    margin: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "200px",
  },
  count: { textAlign: "center", fontWeight: "bold", marginTop: "10px" },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
    padding: "16px",
  },
};