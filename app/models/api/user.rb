class Api::User < ApplicationRecord
    validates :username, presence: true, uniqueness: true

    has_many :posts,
        foreign_key: :user_id,
        class_name: :Post
    
    has_many :comments,
        foreign_key: :user_id,
        class_name: :Comment
end
