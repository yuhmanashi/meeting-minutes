class Student < ApplicationRecord
    validates :first_name, :last_name, :email, :coach, :full_name, presence: true
    validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_many :meetings, dependent: :destroy
    has_many :watchlists, dependent: :destroy
end