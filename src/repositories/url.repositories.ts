import { CreateSurlDTO } from '../dtos/url.dto';
import { SUrlModel, SUrl } from '../models/url.model';

export class UrlRepository {
  async create(data: CreateSurlDTO): Promise<SUrl> {
    return await SUrlModel.create(data);
  }

  async findByShortUrl(shortUrl: string): Promise<SUrl | null> {
    return await SUrlModel.findOne({ shortUrl });
  }

  async findAll(): Promise<SUrl[]> {
    return await SUrlModel.find().sort({ createdAt: -1 });
  }
  async incrementClick(shortUrl: string): Promise<void> {
    await SUrlModel.findOneAndUpdate(
      {
        shortUrl,
      },
      { $inc: { clicks: 1 } },
      { returnDocument: 'after' }
    );
  }
  async findStateByShortUrl(shortUrl: string): Promise<SUrl | null> {
    return await SUrlModel.findOne({ shortUrl });
  }
}

export default new UrlRepository();
