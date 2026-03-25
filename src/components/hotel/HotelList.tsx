"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import HotelCard from "./HotelCard";

const Select = dynamic(() => import("../ui/Select"), { ssr: false });
const MultiSelect = dynamic(() => import("../ui/MultiSelect"), { ssr: false });

const BATCH_SIZE = 20;

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

const HotelList = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/hotels?_per_page=2000");
        const result = await res.json();
        const hotels = Array.isArray(result) ? result : result.data ?? [];
        setAllData(hotels);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setVisibleCount(BATCH_SIZE); 
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const matchesSearch = (hotel: any) => {
    if (!debouncedSearch) return true;

    const words = debouncedSearch.toLowerCase().split(" ").filter(Boolean);
    const text = `${hotel.hotel_name} ${hotel.city} ${hotel.location}`.toLowerCase();

    return words.every((word) => text.includes(word));
  };


  const filteredData = useMemo(() => {
    const sortKey = SORT_MAP[sortBy] ?? "";

    return allData
      .filter((hotel) => {
        if (!matchesSearch(hotel)) return false;

        if (ratingFilter && hotel.rating !== RATING_MAP[ratingFilter]) return false;

        if (
          selectedAmenities.length &&
          !selectedAmenities.every((a) => hotel.amenities?.includes(a))
        )
          return false;

        const price = hotel.total_price;
        if (priceFilter === "Below 500" && price >= 500) return false;
        if (priceFilter === "500 - 1000" && (price < 500 || price > 1000)) return false;
        if (priceFilter === "Above 1000" && price <= 1000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortKey === "priceLow") return a.total_price - b.total_price;
        if (sortKey === "priceHigh") return b.total_price - a.total_price;
        if (sortKey === "ratingHigh") return b.rating - a.rating;
        return 0;
      });
  }, [allData, debouncedSearch, ratingFilter, priceFilter, sortBy, selectedAmenities]);

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [filteredData]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [ratingFilter, priceFilter, sortBy, selectedAmenities]);


  const visibleData = useMemo(() => {
    return filteredData.slice(0, Math.min(visibleCount, filteredData.length));
  }, [filteredData, visibleCount]);

  const hasMore = visibleCount < filteredData.length;

  useEffect(() => {
    if (!hasMore) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) =>
          Math.min(prev + BATCH_SIZE, filteredData.length)
        );
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, filteredData.length]);

  return (
    <div>
      {/* Filters */}
      <div style={styles.filterBar}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search hotels..."
          style={styles.input}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Select options={RATING_OPTIONS} value={ratingFilter} onChange={setRatingFilter} placeholder="Rating" />
          <Select options={PRICE_OPTIONS} value={priceFilter} onChange={setPriceFilter} placeholder="Price" />
          <Select options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} placeholder="Sort" />
          <MultiSelect
            options={["wifi", "pool", "spa", "bar"]}
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            placeholder="Amenities"
          />
        </div>
      </div>


      <p style={styles.count}>
        {loading
          ? "Loading..."
          : `${filteredData.length} hotels (showing ${visibleData.length})`}
      </p>

      <div style={styles.grid} key={filteredData.length}>
        {visibleData.map((hotel, index) => (
          <HotelCard
            key={`${hotel.id}-${index}`} 
            hotel={hotel}
          />
        ))}

        {!loading && filteredData.length === 0 && <p>No hotels found</p>}

        {hasMore && <div ref={sentinelRef} style={{ height: 40 }} />}
      </div>
    </div>
  );
};

export default HotelList;


const styles: any = {
  filterBar: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "center",
    background: "#f5f5f5",
    borderRadius: 10,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    width: 200,
  },
  count: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
};