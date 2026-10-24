import type { AmountItem } from "@/components/AmountList";

export type AmountShare = AmountItem & { share: number };

export const calculateShares = (amountItems: AmountItem[]): AmountShare[] => {
  const totalAmounts = amountItems.reduce((sum, a) => sum + a.amount, 0);

  const result = amountItems.map((item) => ({
    ...item,
    share:
      totalAmounts === 0 ? 0 : Math.round((item.amount / totalAmounts) * 100),
  }));

  return result.sort((a, b) => b.amount - a.amount);
};
