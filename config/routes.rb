Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create]
    resources :meetings, only: [:index, :show, :create, :update]
    resource :session, only: [:show, :create, :destroy]
  end
  get 'home', to: 'static_pages#root'

  root to: 'static_pages#root'
end
