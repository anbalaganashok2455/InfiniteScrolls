"use client";
import { useEffect, useRef, useState } from "react";
import HotelCard from "./HotelCard";

const PER_PAGE = 20;

const HotelList = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchHotels = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    try {
      const url = `http://localhost:3001/hotels?_page=${page}&_per_page=${PER_PAGE}`;

      const res = await fetch(url);

      const result = await res.json();

      console.log("Raw Response:", result);

      const newData = Array.isArray(result) ? result : result.data;

      console.log("New Data Length:", newData?.length);

      setData((prev) => {
        const combined = [...prev, ...newData];

        const unique = Array.from(
          new Map(combined.map((item) => [item.id, item])).values()
        );


        return unique;
      });


      if (!newData || newData.length < PER_PAGE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching hotels:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Page changed:", page);
    fetchHotels();
  }, [page]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    const current = observerRef.current;

    if (current) {
      console.log("Observer attached");
      observer.observe(current);
    }

    return () => {
      if (current) {
        console.log("Observer removed");
        observer.unobserve(current);
      }
    };
  }, [hasMore]);

  return (
    <div style={{display:'flex',flexWrap:'wrap', justifyContent:'center', gap:'16px', padding:'16px'}}>
      {data.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}

      
      {loading && (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}

      {!hasMore && (
        <p style={{ textAlign: "center" }}>No more hotels</p>
      )}

      <div ref={observerRef} style={{ height: "20px" }} />
    </div>
  );
};

export default HotelList;