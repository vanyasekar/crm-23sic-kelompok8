// File: hooks/useOrders.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient"; // Sesuaikan path jika perlu

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [layananData, setLayananData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  const processAnalytics = (data) => {
    const layananCount = {};
    const statusCount = {};

    data.forEach((order) => {
      // Logika penghitungan layanan yang sudah benar (menangani array)
      if (order.layanan) {
        if (Array.isArray(order.layanan)) {
          order.layanan.forEach((namaLayanan) => {
            layananCount[namaLayanan] = (layananCount[namaLayanan] || 0) + 1;
          });
        } else {
          layananCount[order.layanan] = (layananCount[order.layanan] || 0) + 1;
        }
      }
      
      const status = order.status || "Dalam Proses";
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    setLayananData(
      Object.entries(layananCount).map(([layanan, count]) => ({ layanan, count }))
    );
    setStatusData(
      Object.entries(statusCount).map(([status, count]) => ({ status, count }))
    );
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data pesanan:", error.message);
      setOrders([]);
    } else {
      const fetchedOrders = data || [];
      setOrders(fetchedOrders);
      processAnalytics(fetchedOrders);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrder = async (id, field, value) => {
    const { error } = await supabase.from("orders").update({ [field]: value }).eq("id", id);

    if (!error) {
      // Ambil ulang data dari server untuk memastikan data selalu sinkron
      fetchOrders();
    } else {
      alert(`Gagal update ${field}: ` + error.message);
    }
  };
  
  // Hook ini mengembalikan semua state dan fungsi yang dibutuhkan oleh halaman
  return { orders, layananData, statusData, loading, updateOrder };
}