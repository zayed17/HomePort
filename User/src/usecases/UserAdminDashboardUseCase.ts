// import { UserInterface, UserSubscriptionInterface } from '../repositories/interface';
// import { User } from '../entities';

// interface UserGrowth {
//   month: string;
//   userCount: number;
// }

// interface SubscriptionRevenue {
//   month: string;
//   totalRevenue: number;
//   subscribedUserCount: number;
// }

// export class UserAdminDashboardUseCase {
//   constructor(
//     private userRepository: UserInterface,
//     private userSubscriptionRepository: UserSubscriptionInterface
//   ) { }

//   async UserAdminDashboard(): Promise<{ userGrowth: UserGrowth[], subscriptionRevenue: SubscriptionRevenue[] }> {
//     try {
//       const users = await this.userRepository.findAll();
//       const subscriptions = await this.userSubscriptionRepository.findAll();

//       const userGrowth: { [key: string]: number } = {};
//       users.forEach((user: any) => {
//         const createdAt = new Date(user.createdAt);
//         const month = createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });

//         if (!userGrowth[month]) {
//           userGrowth[month] = 0;
//         }
//         userGrowth[month]++;
//       });

//       const subscriptionRevenue: { [key: string]: { revenue: number, count: number } } = {};
//       subscriptions.forEach((subscription: any) => {
//         const startDate = new Date(subscription.startDate);
//         const month = startDate.toLocaleString('default', { month: 'short', year: 'numeric' });

//         if (!subscriptionRevenue[month]) {
//           subscriptionRevenue[month] = { revenue: 0, count: 0 };
//         }
//         subscriptionRevenue[month].revenue += Number(subscription.price); 
//         subscriptionRevenue[month].count++;
//       });

//       const userGrowthArray: UserGrowth[] = Object.entries(userGrowth).map(([month, userCount]) => ({
//         month,
//         userCount,
//       }));

//       const subscriptionRevenueArray: SubscriptionRevenue[] = Object.entries(subscriptionRevenue).map(([month, data]) => ({
//         month,
//         totalRevenue: data.revenue,
//         subscribedUserCount: data.count,
//       }));

//       console.log(userGrowthArray, subscriptionRevenueArray);

//       return { userGrowth: userGrowthArray, subscriptionRevenue: subscriptionRevenueArray };

//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }
// }


import { UserInterface, UserSubscriptionInterface } from '../repositories/interface';
import { User } from '../entities';

interface UserGrowth {
  month: string;
  userCount: number;
}

export class UserAdminDashboardUseCase {
  constructor(
    private userRepository: UserInterface,
    private userSubscriptionRepository: UserSubscriptionInterface
  ) { }

  async UserAdminDashboard(): Promise<{ userGrowth: UserGrowth[], subscriptions: any }> {
    try {
      // Fetch user data
      const users = await this.userRepository.findAll();
      const userGrowth: { [key: string]: number } = {};

      users.forEach((user: any) => {
        const createdAt = new Date(user.createdAt);
        const month = createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });

        if (!userGrowth[month]) {
          userGrowth[month] = 0;
        }
        userGrowth[month]++;
      });

      const userGrowthArray: UserGrowth[] = Object.entries(userGrowth).map(([month, userCount]) => ({
        month,
        userCount,
      }));

      const subscriptions = await this.userSubscriptionRepository.findAll();
console.log(userGrowthArray,subscriptions)
      return { userGrowth: userGrowthArray, subscriptions };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}