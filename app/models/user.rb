class User < ApplicationRecord
  has_secure_password

  validates :email, :session_token, presence: true, uniqueness: true
  validates :first_name, :last_name, presence: true, length: { in: 1..50 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 8..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :meetings, dependent: :destroy
  has_many :watchlists, dependent: :destroy
  has_many :pins, dependent: :destroy,
    foreign_key: :author_id,
    class_name: :Pin
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    
    return nil if user.nil?
    
    user.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64(64)
      break token unless User.where(session_token: token).exists?
      self.session_token = token
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end