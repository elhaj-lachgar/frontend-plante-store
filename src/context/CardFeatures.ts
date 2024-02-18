import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export type TCardItem = {
  id: string;
  category: string;
  image: string;
  price: {
    value: number;
    currency: "USD" | "EUR";
  };
  quantity: number;
  title: string;
};

type TIndex = {
  quantity: number;
  id: string;
};

export type TCard = {
  totalePrice: number;
  cardItems: TCardItem[];
  discountPrice?: number;
  percentage?: number;
  couponId?: string;
};

export interface CardState {
  card: TCard;
}

const initialState: CardState = {
  card: {
    cardItems: [],
    totalePrice: 0,
  },
  
};

const handleCoupon = (state :any) => {
  let totalePrice = 0;
  for (let i = 0; i < state.card.cardItems.length; i++) {
    totalePrice +=
      state.card.cardItems[i].price.value * state.card.cardItems[i].quantity;
  }
  totalePrice -= Math.floor((state.card.percentage * totalePrice) / 100);

  // set totale price
  state.card.discountPrice = totalePrice;

  // set window localstorage
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCard: (state, action: PayloadAction<TCardItem>) => {
      const index = state.card.cardItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index <= -1) {
        // card register on local storage
        const totalePrice = action.payload.price.value + state.card.totalePrice;
        const cardItems = [...state.card.cardItems, action.payload];
        window.localStorage.setItem(
          "card",
          JSON.stringify({ cardItems, totalePrice })
        );

        // set the card redux
        state.card.totalePrice = totalePrice;
        state.card.cardItems = cardItems;

      } else {
        // local storage management
        const totalePrice =
          state.card.totalePrice + state.card.cardItems[index].price.value;

        const cardItems: TCardItem[] = state.card.cardItems.map((item) => {
          return item.id == action.payload.id
            ? {
                category: item.category,
                id: item.id,
                price: item.price,
                quantity: item.quantity + 1,
                title: item.title,
                image: item.image,
              }
            : item;
        });

        window.localStorage.setItem(
          "card",
          JSON.stringify({ cardItems, totalePrice })
        );

        state.card.cardItems[index].quantity += 1;
        state.card.totalePrice += state.card.cardItems[index].price.value;
      }
      if(state.card.percentage){
        handleCoupon(state)
      }
    },
    SetQuantity: (state, action: PayloadAction<TIndex>) => {
      const index = state.card.cardItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index <= -1) return;
      const perQuantity = state.card.cardItems[index].quantity;
      const totalePrice =
        state.card.totalePrice +
        state.card.cardItems[index].price.value * action.payload.quantity -
        state.card.cardItems[index].price.value * perQuantity;

      const cardItems: TCardItem[] = state.card.cardItems.map((item) => {
        return item.id == action.payload.id
          ? {
              category: item.category,
              id: item.id,
              price: item.price,
              quantity: action.payload.quantity,
              title: item.title,
              image: item.image,
            }
          : item;
      });

      state.card.cardItems = cardItems;
      state.card.totalePrice = totalePrice;

      window.localStorage.setItem(
        "card",
        JSON.stringify({ cardItems, totalePrice })
      );
      if(state.card.percentage){
        handleCoupon(state)
      }
    },
    DeleteItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.card.cardItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index <= -1) return;
      const totalePrice =
        state.card.totalePrice -
        state.card.cardItems[index].price.value *
          state.card.cardItems[index].quantity;
      const cardItems = state.card.cardItems.filter(
        (item) => item.id != action.payload.id
      );

      window.localStorage.setItem(
        "card",
        JSON.stringify({ cardItems, totalePrice })
      );

      state.card.cardItems = cardItems;
      state.card.totalePrice = totalePrice;
      if(state.card.percentage){
        handleCoupon(state)
      }
    },
    LoadFromStorage: (state, action: PayloadAction<TCard>) => {
      state.card = action.payload;
    },
    setCoupon: (state, action: PayloadAction<{ percentage: number  ; couponId : string}>) => {
      let totalePrice = 0;
      state.card.percentage = action.payload.percentage;
      state.card.couponId = action.payload.couponId;
      for (let i = 0; i < state.card.cardItems.length; i++) {
        totalePrice +=
          state.card.cardItems[i].price.value *
          state.card.cardItems[i].quantity;
      }
      totalePrice -= Math.floor(
        (action.payload.percentage * totalePrice) / 100
      );

      // set totale price
      state.card.discountPrice = totalePrice;

      // set window localstorage
    },
    setCouponItems: (state) => {
      state.card.discountPrice = undefined;
      state.card.percentage = undefined;
      state.card.couponId = undefined;
      window.localStorage.setItem(
        "card",
        JSON.stringify({
          cardItems: state.card.cardItems,
          totalePrice: state.card.totalePrice,
        })
      );
    },
  },
});

export const {
  AddToCard,
  DeleteItem,
  SetQuantity,
  LoadFromStorage,
  setCoupon,
  setCouponItems,
} = counterSlice.actions;

export default counterSlice.reducer;
