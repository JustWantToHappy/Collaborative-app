import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YesNotState } from 'src/common/enum';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  async invitedRecords(id: number) {
    return await this.contactRepository
      .createQueryBuilder('contact')
      //使用innerJoinAndMapOne可以将查询结果打平
      .innerJoinAndMapOne(
        'result.user', // 查询结果中的结果别名
        User, // 要查询的实体
        'user', // 查询别名
        'user.id = contact.user_id', // 关联条件
      )
      .select([
        'name',
        'email',
        'avatar',
        'contact.id AS id',
        'contact.create_at As create_at',
      ])
      .where('contact.other_id = :id', { id })
      .orderBy('contact.create_at', 'DESC')
      .getRawMany();
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return this.contactRepository.findOne({ where: { id } });
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    const contact = this.findOne(id);
    this.contactRepository.create(Object.assign(contact, updateContactDto));
    return '';
  }

  async remove(id: number) {
    const contact = await this.findOne(id);
    this.contactRepository.remove(contact);
    return '';
  }

  async invite(email: string, id: number) {
    const user = await this.userService.findOnyByEmail(email);
    const invite = await this.contactRepository.findOne({
      where: { user_id: id, other_id: user.id },
    });
    if (invite) {
      throw new ConflictException('你已邀请过此用户');
    }
    const contact = await this.contactRepository.create({
      user_id: id,
      other_id: user.id,
    });
    return this.contactRepository.save(contact);
  }
}
