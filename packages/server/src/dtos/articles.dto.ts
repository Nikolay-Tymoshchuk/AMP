//Data Transfer Object
import { IsString, IsUrl } from 'class-validator';

export class ArticleDto {
  @IsString()
  public title?: string;

  @IsUrl()
  public link?: string;

  @IsString()
  public pubDate?: string;

  @IsString()
  public guid?: string;

  @IsString()
  public description?: string;

  @IsUrl()
  public enclosureUrl?: string;

  @IsString()
  public enclosureType?: string;
}
