class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, index: true, unique: true
      t.string :email, index: true, unique: true
      t.string :password_digest, null: false
      t.string :session_token, index: true, null: false, unique: true

      t.timestamps
    end
  end
end
