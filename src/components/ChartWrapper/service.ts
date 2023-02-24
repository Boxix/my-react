import { request } from "@/utils/request/axio-config";

export async function getChartById(chartId: string) {
  const res = await request.get<{ data: unknown[] }>(`/chart/${chartId}`)
  return res.data.data
}
