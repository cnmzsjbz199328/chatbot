import { UserProfileModel } from '@/db/schema';

interface ContactInfoProps {
  profile: UserProfileModel | null;
}

export default function ContactInfo({ profile }: ContactInfoProps) {
  const hasContactInfo = profile?.location || profile?.phone || profile?.website || profile?.github || profile?.linkedin;

  return (
    <section className="mb-12">
      <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">contact</span>
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {profile?.location && (
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
            <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">location_on</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 break-words">{profile.location}</p>
            </div>
          </div>
        )}

        {profile?.phone && (
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
            <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">phone</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold">电话</h4>
              <p className="text-gray-400 break-words">{profile.phone}</p>
            </div>
          </div>
        )}

        {profile?.website && (
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
            <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">Personal web</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 break-all">
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors break-all">
                  {profile.website}
                </a>
              </p>
            </div>
          </div>
        )}

        {profile?.github && (
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
            <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">GitHub</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 break-all">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors break-all">
                  {profile.github}
                </a>
              </p>
            </div>
          </div>
        )}

        {profile?.linkedin && (
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
            <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">LinkedIn</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 break-all">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors break-all">
                  {profile.linkedin}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* 如果没有联系信息，显示默认内容 */}
        {!hasContactInfo && (
          <div className="col-span-full text-center py-8">
            <span className="material-symbols-outlined text-4xl text-gray-600 mb-2 block">contact_mail</span>
            <p className="text-gray-500">暂无联系信息</p>
          </div>
        )}
      </div>
    </section>
  );
}
