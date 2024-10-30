import { Request, Response, NextFunction } from 'express';
import { AddPropertyUseCase, FindPendingPropertyUseCase, VerifyPropertyUseCase, RejectPropertyUseCase, FindPropertyUseCase, FindAllPropertiesUseCase, FindAdminPropertiesUseCase, BlockUnblockUseCase, FindUserUseCase, AddUserUseCase, ToggleFavouriteUseCaseUseCase, SuccessPaymentUseCase, FindFavouritesUseCase, AddReportUseCase, FindAllReportsUseCase,PaymentUseCase,UpdatePropertyUseCase,DashboardPropertiesUseCase,RepostPropertyUseCase,AdminDashboardUseCase,PresignedUseCase} from '../../usecase';
import { fetchUserDetails } from '../../infrastructure/userGrpcClient';
import Stripe from 'stripe'; 
const stripe = new Stripe('sk_test_51Pkesm094jYnWAeuaCqHqijaQyfRv8avZ38f6bEUyTy7i7rVbOc8oyxFCn6Ih1h2ggzloqcECKBcach0PiWH8Jde00yYqaCtTB');



export class PropertyController {
  constructor(
    private addPropertyUseCase: AddPropertyUseCase,
    private findPendingPropertyUseCase: FindPendingPropertyUseCase,
    private verifyPropertyUseCase: VerifyPropertyUseCase,
    private rejectPropertyUseCase: RejectPropertyUseCase,
    private findPropertyUseCase: FindPropertyUseCase,
    private findAllPropertiesUseCase: FindAllPropertiesUseCase,
    private findAdminPropertiesUseCase: FindAdminPropertiesUseCase,
    private blockUnblockUseCase: BlockUnblockUseCase,
    private findUserUseCase: FindUserUseCase,
    private addUserUseCase: AddUserUseCase,
    private toggleFavouriteUseCaseUseCase: ToggleFavouriteUseCaseUseCase,
    private successPaymentUseCase: SuccessPaymentUseCase,
    private findFavouritesUseCase: FindFavouritesUseCase,
    private addReportUseCase: AddReportUseCase,
    private findAllReportsUseCase: FindAllReportsUseCase,
    private paymentUseCase: PaymentUseCase,
    private updatePropertyUseCase: UpdatePropertyUseCase,
    private dashboardPropertiesUseCase:DashboardPropertiesUseCase,
    private repostPropertyUseCase:RepostPropertyUseCase,
    private adminDashboardUseCase:AdminDashboardUseCase,
    private presignedUseCase:PresignedUseCase



  ) { }


  
  async addProperty(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user._id
      const user = await this.findUserUseCase.FindUser(id)

      console.log(req.body,"chekcin osgfsdf",user,id)
      return
      if (!user) {
        const userDetails = await fetchUserDetails(id);
        console.log(userDetails,"scs")
        await this.addUserUseCase.addUser(userDetails)
      }
      const formData = req.body;
      // const result = await this.addPropertyUseCase.addProperty(files, formData, id);
      // res.status(201).json({ message: 'Property added successfully', result });
    } catch (error) {
      next(error);
    }
  }

  // async preSigned(req: Request, res: Response, next: NextFunction): Promise<any> {
  //   try {
  //     const { files } = req.body;
  //     const urls = await this.presignedUseCase.preSignedUrl(files)
  //     console.log(urls,"csdfsd")
  //     res.json({urls})
  //   } catch (error) {
  //     next(error);
  //   }
  // }


  async preSigned(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { files } = req.body as { files: any[] };
      if (!files?.length) {
        res.status(400).json({ success: false, error: 'No files provided' });
        return;
      }

      const responses: any[] = await this.presignedUseCase.preSignedUrl(files);
console.log(responses,"front end responsive ")
      res.json({ success: true,
        data: {
          urls: responses.map(r => r.presignedUrl),
          publicUrls: responses.map(r => r.publicUrl)
        }
      });
    } catch (error) {
      console.error('Controller error:', error);
      next(error);
    }
  }

  async getPendingProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.findPendingPropertyUseCase.FindPendingProperty('pending');
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.verifyPropertyUseCase.verifyProperty(id);
      res.status(200).json({ message: 'Property verified successfully' });
    } catch (error) {
      next(error);
    }
  }
  async rejectProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      console.log(req.body, "checking what si ")
      const { reason } = req.body;
      await this.rejectPropertyUseCase.rejectProperty(id, reason);
      res.status(200).send({ message: 'Property rejected successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const result = await this.findPropertyUseCase.findProperty(id);
      console.log(result,"chdk in back")
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }



  async findAllProperties(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user._id;
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const { properties, total } = await this.findAllPropertiesUseCase.FindAllProperties(id, page, limit);
      const totalPages = Math.ceil(total / limit);
  
      res.status(200).json({
        totalCount: total,
        totalPages,
        currentPage: page,
        properties
      });
    } catch (error) {
      next(error);
    }
  }
  
  async findAdminProperties(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.findAdminPropertiesUseCase.FindAdminProperties();
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAdminDashboard(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.adminDashboardUseCase.AdminDashboard();
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async blockUblock(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body, "from the current body")
    const { _id, newStatus } = req.body
    try {
      await this.blockUnblockUseCase.BlockUnblock(_id, newStatus)
      res.status(200).json({ success: true });
    } catch (error) {
      next(error)
    }
  }

  async toggleFavourite(req: any, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body, "from the current body")
    const { propertyId, action } = req.body;
    const userId = req.user._id
    try {
      await this.toggleFavouriteUseCaseUseCase.toggleFavourite({ propertyId, userId, action })
      res.status(200).json({ success: true });
    } catch (error) {
      next(error)
    }
  }

  async createPaymentIntent(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.body,"checking body .ocm ")
      const { amount, propertyId } = req.body;
      const id = req.user._id;
      const session = await this.paymentUseCase.execute(amount, propertyId, id);
      res.json({ id: session.id });
    } catch (error) {
      next(error)
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction): Promise<any> {
    const sig = req.headers['stripe-signature'] as string;
    const rawBody = req.body as Buffer;
    const endpointSecret = 'whsec_NXib2dT77jJqBgq3UC9bPiQtuPpmofhx'

    if (!sig) {
      return res.status(400).send('Missing Stripe signature');
    }

    let event: Stripe.Event;
    try {
      event = Stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      console.error('Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const sessionId = session.id;
      const propertyId = session?.metadata?.propertyId!

      try {
        const result = await this.successPaymentUseCase.processPayment(sessionId, propertyId);
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
      res.status(200).send('Event received');
    }
  }


  async findFavourites(req: any, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user._id
    try {
      const result = await this.findFavouritesUseCase.findFavourites(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async addReport(req: any, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user._id
    const report = {
      ...req.body,
      reportId: userId
    }
     try {
      const result = await this.addReportUseCase.addReport(report);
      await this.updatePropertyUseCase.Update(req.body.propertyId,1)
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async findReports(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.findAllReportsUseCase.findAllReports();
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async dashboardProperties(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user._id
      const result = await this.dashboardPropertiesUseCase.FindAllProperties(id);
      // console.log(result)
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async RepostProperty(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      const formData = req.body;
      console.log(formData)
      const result = await this.repostPropertyUseCase.RepostProperty(files, formData);
      res.status(201).json({ message: 'Property added successfully', result });
    } catch (error) {
      next(error);
    }
  }
}